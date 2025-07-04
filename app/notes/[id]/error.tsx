'use client'

type Props = {
    error: Error
}

const ErrorComponent = ({error}: Props) => {
    return <p>Could not fetch note details. {error.message}</p>
}

export default ErrorComponent