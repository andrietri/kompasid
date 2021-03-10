import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DetailSnack from '../components/DetailSnack'
import TotalSnack from '../components/TotalSnack'

const Snack = (props) => {
    let data = (
        <>
            <Row style={{ marginTop: "50px" }}>
                {props.item.map((valueTwo, indexTwo) => 
                (
                    <Col md={3} key={props.id} style={{ marginBottom: "50px" }} key={indexTwo}>
                    <h5 key={props.id}>{ valueTwo.date }</h5> 
                    <br/>

                    {valueTwo.children.map((valueThree, indexThree) =>
                        <DetailSnack key={ indexThree } item={ valueThree } id={ indexThree }/>
                    )}

                    <TotalSnack item={ valueTwo }/>
                    </Col>
                )
                )}
            </Row>
        </>
    )

    return (
        <>
            {data}
        </>
    )
}

export default Snack