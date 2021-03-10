import Form from 'react-bootstrap/Form'

const InputPrice = (props) => {
    let data = (
        <>
            <Form.Group>
                <Form.Label>Harga</Form.Label>
                <Form.Control type="number" placeholder="Harga" id="cost"/>
            </Form.Group>
        </>
    )

    return (
        <>
            {data}
        </>
    )
}

export default InputPrice