import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"




const filterData = [
  {
    filterType: "Location",
    array: ["Navsari", "khadsupa", "Surat", "India", "Banglore"]
  },
  {
    filterType: "Industry",
    array: ["Frontendn Developer", "Backend Developer", "Fullstack Developer", "Designer Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-45k", "46-11Lakh", "12-40lakh"]
  }
]

function FilterJob() {
  return (
    <div>
      <h1 className='font-bold text-lg'>Filter Job</h1>
      <hr className='mt-3' />
      <RadioGroup>

        {
          filterData.map((data, index) => (
            <div className='w-full bg-white rounded-md'>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, index) => {
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} />
                      <Label>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterJob