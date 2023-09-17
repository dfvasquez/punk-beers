import React, { ReactNode } from 'react'
import './Definition.css'

interface IDefinitionProps {
  title: string
  description: ReactNode
}

const Definition: React.FC<IDefinitionProps> = ({ title, description }) => {
  return (
    <div className='definition-container'>
      <h2 className='definition-title'>{title}</h2>
      {description}
    </div>
  )
}

export default Definition
