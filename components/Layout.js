import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Layout = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Container>
                <Row>
                    <Col style={{ marginTop: "50px" }}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Layout