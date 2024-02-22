import React from 'react'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

// App imports
import EditProductVariantForm from '@components/admin/operations/EditProductVariantForm'
import AdminSectionHeader from '@components/admin/shared/AdminSectionHeader'
import { queryAllProducts, queryAllProductVariants } from '@constants/shared/queries'
import getQueryClient from '@services/shared/getQueryClient'

export default async function Page() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queryAllProducts())
  await queryClient.prefetchQuery(queryAllProductVariants())
  
  return (
    <>
      <AdminSectionHeader
        category={'Operation'}
        title={'Edit product variant'}
        description={'Check details about the product and other pertinent information.'}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditProductVariantForm />
      </HydrationBoundary>
    </>
  )
}