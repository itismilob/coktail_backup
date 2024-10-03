import { useEffect, useRef } from 'react'

export default function useInfiniteScroll(onIntersectHandler) {
  const ref = useRef()
  const observer = useRef()

  useEffect(() => {
    if (!ref.current) return

    const observerCallback = (entries) => {
      if (entries[0].isIntersecting) {
        onIntersectHandler()
        // console.log('collapsed')
      }
    }

    observer.current = new IntersectionObserver(observerCallback, {
      threshold: 1,
    })

    observer.current.observe(ref.current)

    return () => {
      observer.current.disconnect()

      console.log('observer disconnected')
    }
  }, [ref])

  return [ref, observer]
}
// cleanup
// 페이지가 언마운트 되었을 때 ovserver disconnect
