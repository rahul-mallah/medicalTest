import Reeact, {useRef, useState} from 'react'
import IdleTimer from 'react-idle-timer'
import { auth } from '../firebase';
import Modal from 'react-modal'
import {Container} from 'react-bootstrap'

Modal.setAppElement('#root')

function IdleTimerContainer(){
    const [modalIsOpen, setModalIsOpen] = useState(false) 
    const idleTimerRef = useRef(null)
    const sessionTimeoutRef = useRef(null)

    const onIdle = () => {
        setModalIsOpen(true)
        //timeout within 5 secs
        sessionTimeoutRef.current = setTimeout(logOut, 5 * 1000)
    }

    const stayActive = () => {
        setModalIsOpen(false)
        clearTimeout(sessionTimeoutRef.current)
    }

    const logOut = () => {
        setModalIsOpen(false)
        auth.signOut()
        clearTimeout(sessionTimeoutRef.current)
    }


return (
    <div>
        {/* {
        isLoggedIn ? <h2>Hello Jas</h2>: <h2>Hello Guest</h2>
        } */}
        <Container className="d-flex align-items-center justify-content-center">
        <Modal isOpen = {modalIsOpen}>
            <h1 style = {{fontSize: "60px"}}>You've been idle for awhile!</h1>
            <h1 style = {{fontSize: "30px"}}>You will be logged out soon</h1>
            <div>
                <button onClick ={logOut}>Log me out</button>
                <button onClick = {stayActive}>Keep me logged in</button>  
            </div>
        </Modal>
        </Container>
        <IdleTimer ref = {idleTimerRef}
         timeout = {1000 * 60 * 15} //Session will time out within 15 minutes
          onIdle = {onIdle}>
        </IdleTimer>
    </div>
)
}

export default IdleTimerContainer