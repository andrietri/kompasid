import Form from 'react-bootstrap/Form'

const InputName = (props) => {
    let data = (
        <>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" id="name"/>
            </Form.Group>
        </>
    )

    return (
        <>
            {data}
        </>
    )
}

export default InputName