import {useState, useEffect} from 'react'

export function useQueryData(){
    const [data, setData] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | undefined>()
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    useEffect(()=>{
      setErrorMessage(error?.message)  
    }, [error])

    async function query(promise: Promise<any>): Promise<any>{
      try {
        setError(undefined)
        setIsLoading(true)
        const data = await promise
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    return {
      query,
      data, setData,
      isLoading, setIsLoading,
      error, setError,
      errorMessage, setErrorMessage,
    }
}
