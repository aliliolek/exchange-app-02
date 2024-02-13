'use client';
import { getXataClient } from '@/xata';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Spacer, Textarea } from '@nextui-org/react'
import { revalidatePath } from 'next/cache';
import React, { useRef } from 'react';

export default function FolderForm({ handleCreateFolder }: {
    handleCreateFolder: (formData: FormData) => Promise<void>;
}) {
const ref = useRef<HTMLFormElement>(null)

  return (
    <Card className="min-w-[400px]">
    <CardHeader className="flex gap-3">
        <p className="text-md">Some form:</p>
    </CardHeader>
    <Divider/>
    <CardBody className="flex flex-col gap-12">
    <form 
        action={(formData) => {
            handleCreateFolder(formData);
            ref.current?.reset();
        }} 
        ref={ref}
    >                
            <Input name="name" id="name" type="text" placeholder="my folder"/>
            <Spacer />
            <Button type="submit" color="primary" className="w-full">
                Send
            </Button>
        </form>
    </CardBody>
    <Divider/>
    <CardFooter>
        <p className="text-md">
            Just trying something
        </p>
    </CardFooter>
    </Card>
  )
}
