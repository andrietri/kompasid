import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Layout from '../components/Layout'
import Snack from '../components/Snack'
import Title from '../components/Title'
import InputName from '../components/InputName'
import InputPrice from '../components/InputPrice'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Loader from 'react-loader-spinner'
import Moment from 'moment'
import Modal from 'react-modal'
import Router from 'next/router'

import fetchItemDataAction from '../redux/actions/fetchItemDataAction'
import addItemsDataAction from '../redux/actions/addItemsDataAction'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const useFetch = () => {
  Moment.locale('en');
  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  
  const runEffect = async () => {
    const res = await dispatch(fetchItemDataAction())
    const results = await res.payload

    const item = results.map((data, index) => {
      const date = Moment(data.created_at).format('D MMMM YYYY')
      const time = Moment(data.created_at).format('HH:mm')
      const month = Moment(data.created_at).format('MMMM')

      return { ...data, date, time, month }
    })

    setData(item)
    setLoading(false)
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    runEffect()
  }, [])

  return {
    data,
    loading
  };
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('div')

const App = ({ }) => {
  let content
  let sumMonth = 0
  const item = useSelector((state) => state.item)

  const { data,loading } = useFetch()
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)

  const closeModal = (setIsOpen) => {
    setIsOpen(false)
  }

  const openModal = (setIsOpen) => {
    setIsOpen(true)
  }

  const addItem = (setIsOpen) => {
    openModal(setIsOpen)
  }

  const onSubmit = (event, dispatch, setIsOpen) => {
    event.preventDefault(event)

    let params = {}

    params.name = event.target.name.value
    params.cost = parseInt(event.target.cost.value)
    params.created_at =  Moment(new Date()).format("YYYY-MM-DD h:mm:ss")

    dispatch(addItemsDataAction(params))
    Router.push({
        pathname: '/redirect',
        query: { page: 'diary' }
    })

    closeModal(setIsOpen)
  }

  if (item.process === 'DONE' && !loading){
    const map = new Map
    data.forEach(({ date, month, cost, name, time }) => {
        map.has(date) || map.set(date, { date, month, children: [] });
        map.get(date).children.push({ cost, name, time });
    });
    const result = [...map.values()];

    const mapTwo = new Map
    result.forEach(({ date, month, children }) => {
      mapTwo.has(month) || mapTwo.set(month, { month, values: [] });
      mapTwo.get(month).values.push({ date, month, children });
    });
    const resultFinal = [...mapTwo.values()];

    content = (
      <>
        {resultFinal.map((value, index, values) => 
          <Container key={index}>
            <center>
              <Title item={ value }/>

              {result.map((valueResult,indexResult) =>
                {
                  if(valueResult.month == value.month){
                    sumMonth += valueResult.children.reduce((a,v) =>  a = a + v.cost,0)
                  }
                }
              )}

              <p>Pengeluaran Bulan ini Rp { sumMonth }</p>
              {/* { Moment().format('MMMM') !== value.month ? "" : */}
                {/* <Button style={{ backgroundColor: "#5f27cd", borderRadius: "0px" }} onClick={() => addItem(setIsOpen)}>TAMBAH ITEM</Button> */}
              {/* } */}
              <Button style={{ backgroundColor: "#5f27cd", borderRadius: "0px" }} onClick={() => addItem(setIsOpen)}>TAMBAH ITEM</Button>
            </center>

            <Snack item={ value.values } key={ index } id={ index }/>
          </Container>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => closeModal(setIsOpen)}
          style={customStyles}
          appElement={document.getElementById('app')}
        >
          <h4>Tambah Entri</h4>
          <Form onSubmit={(event) => onSubmit(event, dispatch, setIsOpen)}>
            <InputName/>
            <InputPrice/>

            <Button 
              style={{ backgroundColor: "#636e72", borderRadius: "0px" }} 
              onClick={() => closeModal(setIsOpen)}
            >
              BATAL
            </Button>
            <Button 
              style={{ backgroundColor: "#5f27cd", borderRadius: "0px" }} 
              type="submit"
            >
              KIRIM
            </Button>
          </Form>
        </Modal>
      </>
    )
  }else{
    content = (
      <>
        <center style={{ marginTop: "100px" }}>
          <Loader
            type="Audio"
            color="#e74c3c"
            height={100}
            width={100}
            timeout={10000} //3 secs
          />
        </center>
      </>
    )
  }

  return (
    <>
      <Layout title="Snack">
        { content }
      </Layout>
    </>
  )
}

// App.getInitialProps = async ({ store }) => {
//     return {}
// }

export default App
