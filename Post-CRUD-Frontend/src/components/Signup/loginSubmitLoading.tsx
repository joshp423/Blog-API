
type FormSubmitLoadingProps = {
    loading: boolean
}

function FormSubmitLoading({ loading }:FormSubmitLoadingProps) {
    if (loading) {
        return(
            <div className="loading"></div>
        )
    }
    return(
        <button type="submit">Sign Up</button>
    )

}

export default FormSubmitLoading