import React from 'react'
import ActionButton, {
  IActionButton
} from '../buttons/actionButton/ActionButton'
import beers from '../../assets/beers.svg'
import './NotFound.css'

interface INotFoundProps {
  title: string
  description: string
  action?: {
    text: string
    buttonProps: IActionButton
  }
}

const NotFound: React.FC<INotFoundProps> = ({ title, description, action }) => {
  return (
    <div className='not-found-beer-container flex-col'>
      <h1>{title}</h1>
      <h2>{description}</h2>
      {action && (
        <div className='not-found-beer-footer'>
          <h2>{action.text}</h2>
          <ActionButton
            text={action.buttonProps.text}
            onClick={action.buttonProps.onClick}
            type={action.buttonProps.type}
          />
        </div>
      )}
      <img className='align-left' src={beers} alt='3 Beers' />
      <img className='flipped align-right' src={beers} alt='3 Beers' />
    </div>
  )
}

export default NotFound
