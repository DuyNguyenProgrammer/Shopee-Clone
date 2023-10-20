/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FloatingPortal, useFloating, arrow, shift, offset } from '@floating-ui/react'
import { ElementType, useId, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
}

export default function Popover({ children, className, renderPopover, as: Element = 'div', initialOpen }: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef(null)

  const { refs, floatingStyles } = useFloating({
    middleware: [
      offset(5),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })

  const id = useId()

  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={floatingStyles}
              // initial={{ opacity: 0, transform: 'scale(0)' }}
              // animate={{ opacity: 1, transform: 'scale(1)' }}
              // exit={{ opacity: 0, transform: 'scale(0)' }}
              // transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute translate-y-[-95%] z-10 ml-[60px]'
              ></span>
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
