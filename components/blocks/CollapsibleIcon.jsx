import { BookmarkBorder, BookmarkOutlined, Reddit } from '@mui/icons-material'
import React from 'react'

function CollapsibleIcon({service_name}) {
 const render = ()=>{
    switch(service_name.toLowerCase()){
        case 'reddit': return <Reddit className="text-primary-text dark:text-light-text"/>
        default: return <BookmarkOutlined className="text-primary-text dark:text-light-text"/>
    }
 }
  return (
    render()
  )
}

export default CollapsibleIcon