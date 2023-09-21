import classNames from 'classnames'
import './ActionButton.css'

export interface IActionButton {
  text: string
  type: 'primary' | 'secondary' | 'inactive'
  disabled?: boolean
  onClick: () => void
}

export default function ActionButton({
  text,
  onClick,
  type = 'primary',
  disabled = false
}: IActionButton) {
  return (
    <div
      className={classNames(`action-button ${type}`, { disabled: disabled })}
      onClick={onClick}>
      {text}
    </div>
  )
}
