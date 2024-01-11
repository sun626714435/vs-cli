import { ElLoading } from 'element-plus'

export const useApiLoading = () => {
  let loading: any
  let count = 0

  const addLoading = () => {
    count++
    if (!loading) {
      loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)',
      })
    }
  }

  const clearLoading = () => {
    count--
    if (count === 0) {
      loading?.close()
      loading = null
      document.body.removeAttribute('loading-number')
    }
  }

  return {
    addLoading,
    clearLoading,
  }
}
