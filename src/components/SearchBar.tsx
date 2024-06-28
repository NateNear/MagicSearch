// import React from 'react'
"use client"

import { useRef, useState, useTransition } from "react"
import { Loader2, Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter, useSearchParams } from "next/navigation"

function SearchBar() {
    const searchParams = useSearchParams()
    const defaultQuery = searchParams.get("query") || ''
    const [query, setquery] = useState<string>(defaultQuery)
    const inputRef = useRef(null);
    const [isSearching, startTransition] = useTransition();
    const router = useRouter();

    const search = () => {
        startTransition(() => {
            router.push(`./search?query=${query}`)
        })
    }

  return (
    <div className="relative w-full h-14 flex flex-col bg-white">
        <div className="relative h-14 z-10 rounded-md">
            <Input
                disabled={isSearching} 
                ref={inputRef} 
                onKeyDown={(e) => {
                if(e.key === "Enter"){
                    search()
                }
                if(e.key === "Escape" ){
                    inputRef?.current?.blur()
                }
            }} 
            value={query}
            onChange={(e)=> setquery(e.target.value) }
            className="absolute inset-0 h-full"/>
            <Button
             disabled={isSearching}
             onClick={search}
             className=" absolute h-full right-0 inset-y-0 rounded-l-none">

             {isSearching ? <Loader2 className="h-6 w-6 animate-spin"/> : <Search className="h-6 w-6"/>}
                
            </Button>
        </div>
    </div>
  )
}

export default SearchBar