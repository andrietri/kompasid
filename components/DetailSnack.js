import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DetailSnack = (props) => {
    let data = (
        <>
            <Row key={ props.id }>
                <Col md={4}><span style={{ fontSize: "12px" }}>{ props.item.time }</span></Col>
                <Col md={4}><span style={{ fontSize: "12px" }}>{ props.item.name }</span></Col>
                <Col md={4}><span style={{ fontSize: "12px" }}>Rp { props.item.cost }</span></Col>
            </Row>
        </>
    )

    return (
        <>
            {data}
        </>
    )
}

export default DetailSnack