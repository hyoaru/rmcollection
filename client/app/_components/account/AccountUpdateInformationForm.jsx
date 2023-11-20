"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from 'next/link'

// App imports
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { ACCOUNT_UPDATE_INFORMATION_FORM as formSchema } from '@constants/account/forms'

export default function AccountUpdateInformationForm(props) {
  const { userStateGeneral } = props

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: userStateGeneral.id,
      email: userStateGeneral.email,
      firstName: userStateGeneral.first_name,
      lastName: userStateGeneral.last_name,
    }
  })

  async function onSubmit(data){

  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 gap-y-2">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className={'col-span-6'}>
                  <FormLabel className={'text-muted-foreground'}>User Id</FormLabel>
                  <FormControl>
                    <Input placeholder="your-user-id" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={'col-span-6'}>
                  <FormLabel className={'text-muted-foreground'}>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your-email" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className={'col-span-6'}>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="your-first-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className={'col-span-6'}>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="your-last-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" size={'lg'} className="mt-8 flex mx-auto w-full lg:w-1/2">Save changes</Button>

        </form>
      </Form>
    </>
  )
}
