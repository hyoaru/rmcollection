"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";

// App imports
import ProductViewActions from "@components/collection/product/ProductViewActions";
import { queryRandomProductsByProductId } from "@constants/collection/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import Breadcrumbs from "@components/collection/shared/Breadcrumbs";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import ProductCard from "@components/collection/shared/ProductCard";
import { queryProductById } from "@constants/shared/queries";
import { Tables } from "@constants/base/database-types";
import Separator from "@components/shared/Separator";
import { Badge } from "@components/ui/badge";
import { Skeleton } from "@components/ui/skeleton";

type ProductViewProps = {
  productId: string;
  authenticatedUser: Tables<"users"> | null;
};

export default function ProductView({ productId, authenticatedUser }: ProductViewProps) {
  const { data: product, isLoading, isFetching } = useQuery(queryProductById(productId));
  const { data: randomProducts } = useQuery(queryRandomProductsByProductId(productId));
  const productVariants = product?.data?.product_variants?.filter((variant) => variant.is_displayed === true);

  if (product?.error || randomProducts?.error) {
    return notFound();
  }

  const breadcrumbs = [
    { label: "Collection", link: "/collection" },
    { label: product?.data?.category ?? "-", link: `/collection/${product?.data?.category}s` },
    { label: product?.data?.name ?? "-", link: `/collection/product/${productId}` },
  ];

  if (isLoading || isFetching) {
    return (
      <>
        <Skeleton className="h-[20px] w-6/12 rounded-md mb-4 md:w-2/12 sm:mb-0" />
        <div className="grid grid-cols-12 gap-5 sm:gap-10 sm:mt-4 md:gap-12 lg:gap-14">
          <div className="col-span-12 sm:col-span-7 md:col-span-8">
            <Skeleton className="w-full h-[300px] rounded-lg sm:h-screen" />
          </div>
          <div className="col-span-12  sm:col-span-5 md:col-span-4">
            <div className="flex justify-start mb-3 gap-2 sm:mb-6">
              <Skeleton className="w-3/12 h-[20px] rounded-md" />
              <Skeleton className="w-3/12 h-[20px] rounded-md" />
            </div>

            <div className="space-y-2 md:space-y-5 mb-4">
              <div>
                <Skeleton className="w-8/12 h-[40px] rounded-md mb-1" />
                <Skeleton className="w-6/12 h-[15px] rounded-md mb-1" />
              </div>
            </div>

            <Skeleton className="w-full h-[200px] rounded-lg mb-10 sm:h-[500px]" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="px-2 hidden sm:block">
        <Breadcrumbs breadcrumbs={breadcrumbs!} />
      </div>

      <div className="">
        <Tabs defaultValue={productVariants?.[0].id}>
          <div className="grid grid-cols-12 gap-5 sm:gap-10 sm:mt-4 md:gap-12 lg:gap-14">
            <div className="col-span-12 sm:col-span-7 md:col-span-8">
              <div className="md:mb-16">
                {productVariants?.map((productVariant) => (
                  <TabsContent
                    value={productVariant.id}
                    key={`TabContentImageList-${productVariant.id}`}
                    className="relative"
                  >
                    <div className="block absolute z-[2] bottom-0 left-0 right-0 sm:hidden">
                      <div className="w-full bg-gradient-to-t from-black h-[70px] opacity-30 rounded-br-xl rounded-bl-xl">
                        <div className="h-full flex w-full justify-center items-center"></div>
                      </div>
                    </div>
                    <div className="overflow-y-auto h-[300px] rounded-xl sm:h-full">
                      <div className={`flex flex-col sm:block sm:columns-1 `}>
                        {productVariant.images_public_url?.map((variantImagePublicUrl, index) => (
                          <Image
                            alt=""
                            className={"rounded-xl w-full"}
                            width={1000}
                            height={1000}
                            src={variantImagePublicUrl}
                            key={`TabContentImage-${productVariant.id}-${index}`}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
            <div className="col-span-12  sm:col-span-5 md:col-span-4">
              <div className="px-4 sm:px-0 sm:sticky sm:top-20">
                {productVariants?.map((productVariant, index) => (
                  <TabsContent value={productVariant.id} key={`TabContent-${productVariant.id}-${index}`}>
                    <div className="flex justify-start mb-3 gap-2 sm:mb-6">
                      <Badge className={"capitalize"}>{product?.data?.category}</Badge>
                      <Badge className={""}>{`${productVariants?.length} variant(s)`}</Badge>
                    </div>

                    <div className="space-y-2 md:space-y-5">
                      <div id="productHeader" className="text-start">
                        <h2 className="text-2xl font-bold mb-1 capitalize lg:text-3xl">{product?.data?.name}</h2>
                        <h4 className="text-sm opacity-50">{`${productVariant.id}`}</h4>
                        <h4 className="text-sm text-muted-foreground">
                          <span className="font-semibold">In stock: </span>
                          {productVariant.quantity.toLocaleString()}
                        </h4>
                      </div>

                      {productVariant.discount_rate > 0 && (
                        <>
                          <div className="">
                            <p className="">
                              <span className="font-semibold">Original price: </span>
                              {`₱ ${productVariant.price.toLocaleString()}`}
                            </p>
                            <p>
                              <span className="font-semibold">Discount: </span>
                              {productVariant.discount_rate}% off
                            </p>
                          </div>
                        </>
                      )}

                      <div id="productVariantSpecification" className="text-md">
                        <p>
                          <span className="opacity-50 ">Stock locations: </span>
                          <span className="">{product?.data?.stock_locations.join(", ")}</span>
                        </p>
                        <p>
                          <span className="opacity-50 ">Material: </span>
                          <span className="">{productVariant.material}</span>
                        </p>
                        <p>
                          <span className="opacity-50 ">Material property: </span>
                          <span className="">{productVariant.material_property}</span>
                        </p>
                        <p>
                          <span className="opacity-50 ">Size: </span>
                          <span className="">{productVariant.size ?? "--"}</span>
                        </p>
                        <p>
                          <span className="opacity-50 ">Weight: </span>
                          <span className="">{productVariant.weight ?? "--"}</span>
                        </p>
                      </div>

                      <div id="product.description">
                        <p className="whitespace-pre-wrap">{product?.data?.description}</p>
                      </div>
                    </div>

                    {productVariants.length > 1 && (
                      <>
                        <div className="my-6">
                          <div className="">
                            <TabsList className={"bg-background flex justify-start flex-wrap gap-1 w-full h-max px-0"}>
                              {productVariants.map((productVariant, index) => (
                                <TabsTrigger
                                  key={`TabTrigger-${productVariant.id}`}
                                  value={productVariant.id}
                                  className={
                                    "px-3 rounded-lg transition-all ease-in-out duration-500 border border-secondary hover:bg-secondary data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:border-primary"
                                  }
                                >
                                  {productVariant.material}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                          </div>
                        </div>
                      </>
                    )}

                    {authenticatedUser && (
                      <>
                        <div className="mt-8 border-t py-4 space-y-4">
                          <ProductViewActions
                            authenticatedUser={authenticatedUser}
                            product={product?.data!}
                            productVariant={productVariant}
                          />
                        </div>
                      </>
                    )}
                  </TabsContent>
                ))}
              </div>
            </div>
          </div>
        </Tabs>

        {randomProducts?.data?.[0] && (
          <div className="">
            <Separator>
              <h3 className="text-center my-10 text-lg text-muted-foreground">Other jewelries you might like</h3>
            </Separator>

            <ScrollArea className={"whitespace-nowrap rounded-lg mb-10"}>
              <div className="flex w-full space-x-4 py-6 justify-center">
                {randomProducts?.data?.map((randomProduct, index) => (
                  <div className="w-max rounded-lg" key={`RandomProduct-${randomProduct.id}`}>
                    <ProductCard
                      product={randomProduct}
                      classNames={{
                        image: "h-[250px]",
                      }}
                    />
                  </div>
                ))}
              </div>
              <ScrollBar orientation={"horizontal"} />
            </ScrollArea>
          </div>
        )}
      </div>
    </>
  );
}
