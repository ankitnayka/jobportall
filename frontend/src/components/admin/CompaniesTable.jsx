import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'


function CompaniesTable() {
    return (
        <div>

            <Table className="mt-10">
                <TableCaption>A list of Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    <TableRow>

                        <TableCell>
                            <Avatar>
                                <AvatarImage
                                    src="https://png.pngtree.com/template/20190530/ourmid/pngtree-bird-logo-vector-image_204552.jpg"
                                />
                            </Avatar>
                        </TableCell>
                        <TableCell>Full Stack Developer</TableCell>
                        <TableCell>AB it Solution</TableCell>
                        <TableCell className='text-right '>
                            <Popover>
                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                <PopoverContent className="w-32">
                                    <div className='flex border border-black-700 items-center gap-2 w-fit cursor-pointer'>
                                        <Edit2 className='w-4' />
                                        <span>Edit</span>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable