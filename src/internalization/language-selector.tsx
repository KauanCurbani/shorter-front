"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Language, useLanguage } from "./context"

export function LanguageSelector() {
  const {selectedLanguage, setLanguage} = useLanguage()
  
  return <Select onValueChange={(e: Language) => setLanguage(e)} defaultValue={selectedLanguage}>
       <SelectTrigger className="" >
         <SelectValue  />
       </SelectTrigger>
       <SelectContent>
         <SelectGroup>
           <SelectLabel>Languages</SelectLabel>
           <SelectItem value="PT-BR">🇧🇷 PT-BR</SelectItem>
           <SelectItem value="EN">🇺🇸 EN</SelectItem>
         </SelectGroup>
       </SelectContent>
     </Select>
}