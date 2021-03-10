import { useRouter } from 'next/router'

function RedirectPage() {
    const router = useRouter()
    const { page } = router.query

    // Make sure we're in the browser
    if (typeof window !== 'undefined') {
        router.push(`/${page}`)
    }
    return (
        <>
        </>
    )
}

export default RedirectPage