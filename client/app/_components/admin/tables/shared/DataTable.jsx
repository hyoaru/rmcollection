"use client"

import React from 'react'

// App imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import useGetTable from '@hooks/admin/operations/useGetTable'
import { formatTimestampTable } from '@lib/formatTimestamp'

export default function DataTable(props) {
  const { data, columnDefinition } = props

  columnDefinition.push(
    { accessorFn: (row) => formatTimestampTable(row.created_at), header: 'created_at' },
    { accessorFn: (row) => formatTimestampTable(row.created_at), header: 'updated_at' },
  )

  const { table, globalFilter, setGlobalFilter, pageRef, flexRender } = useGetTable({
    data: data,
    columnDefinition: columnDefinition
  })

  function onGlobalFilterChange(event) {
    setGlobalFilter(event.target.value)
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row mb-4 gap-2">
        <Input
          type="text"
          placeholder="Filter table"
          className="w-full sm:w-1/2 me-auto"
          value={globalFilter}
          onChange={onGlobalFilterChange}
        />
        <Button variant={'secondary'}>Export to CSV</Button>
      </div >

      <Table>
        <TableHeader className={'bg-secondary'}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <Button
                    size={'sm'} variant={'ghost'}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`${header.column.getIsSorted() ? 'text-primary font-bold' : ''}`}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{ asc: ' ⏶', desc: ' ⏷' }[header.column.getIsSorted()] ?? null}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
