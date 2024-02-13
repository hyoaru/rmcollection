"use server"

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
// App imports
import { getServerClient } from "@services/supabase/getServerClient"

export default async function deleteProductVariant(productVariantId) {
  const BUCKET_NAME = 'products'
  const supabase = await getServerClient()

  let { count } = await supabase
    .from('product_variants')
    .select(`*, orders!inner(*, order_status!inner(*))`, { count: 'exact', head: true })
    .eq('id', productVariantId)
    .in('orders.order_status.label', ['pending', 'to-ship', 'to-receive'])

  if (count > 0) {
    return { data: null, error: { message: `Product variant has ${count} ongoing orders`} }
  }

  const { data, error } = await supabase
    .from('product_variants')
    .select('*')
    .eq('id', productVariantId)
    .single()
    .then(async ({ data: getProductVariantData, error: getProductVariantError }) => {
      if (getProductVariantError) {
        return { data: getProductVariantData, error: getProductVariantError }
      }

      const { data, error } = await supabase
        .storage
        .from(BUCKET_NAME)
        .list(`${getProductVariantData.product_id}/${productVariantId}`, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        })
        .then(async ({ data: listProductVariantImagesData, error: listProductVariantImagesError }) => {
          if (listProductVariantImagesError) {
            return { data: listProductVariantImagesData, error: listProductVariantImagesError }
          }

          const productVariantImages = listProductVariantImagesData.map((row) => (
            `${getProductVariantData.product_id}/${productVariantId}/${row.name}`
          ))

          const { data, error } = await supabase
            .storage
            .from(BUCKET_NAME)
            .remove(productVariantImages)

          return { data, error }
        })

      return { data, error }
    })
    .then(async ({ data: deleteProductVariantImagesData, error: deleteProductVariantImagesError }) => {
      if (deleteProductVariantImagesError) {
        return { data: deleteProductVariantImagesData, error: deleteProductVariantImagesError }
      }

      const { data, error } = await supabase
        .from('product_variants')
        .delete()
        .eq('id', productVariantId)

      return { data, error }
    })

  return { data, error: processErrorToCrossSideSafe(error) }
}