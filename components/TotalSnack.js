import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const TotalSnack = (props) => {
    let data = (
        <>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <span style={{ fontSize: "12px", fontWeight: "bold" }}>Total</span>
                </Col>
                <Col md={4}>
                    <span style={{ fontSize: "12px" }}>Rp {props.item.children.reduce((a,v) =>  a = a + v.cost,0)}</span>
                </Col>
            </Row>
        </>
    )

    return (
        <>
            {data}
        </>
    )
}

export default TotalSnack