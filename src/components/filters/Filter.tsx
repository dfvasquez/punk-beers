import { useState } from 'react'
import ActionButton from '../buttons/actionButton/ActionButton'
import './Filter.css'
import classNames from 'classnames'

export default function Filter() {
  const [show, setShow] = useState<boolean>(false)

  const handleOnClose = () => {
    setShow(false)
  }

  return (
    <>
      <div className={classNames('filters', { show: show })}>
        <div>
          <div className='filter-header-container'>
            <h2>Filters</h2>
            <span className='close' onClick={handleOnClose}>
              &times;
            </span>
          </div>
        </div>
      </div>

      <div className='filter-container'>
        <ActionButton
          text={'Filters'}
          type={'selected'}
          onClick={() => setShow(true)}
        />
      </div>
      <div className={classNames('overlay', { active: show })} />
    </>
  )
}
