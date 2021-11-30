import React from "react";
import "../assets/Style/personal.css";
import { Container,Row,Col,Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft,faCamera,faUpload} from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';
import { Redirect,Link } from "react-router-dom";
var nimc = require("../assets/images/NIMC-logo.jpg");
var africo = require("../assets/images/ID-Verify-logo.png");


var logo = require("../assets/images/IDVerify Logo.png");
var activeTab = require("../assets/images/Active Tab Indicator (User Data).png")
var tab = require ("../assets/images/tabCombined.png");

export default class ImageCapture extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            loader:false,
            loggedin:false
        }
    }

  
    render(){
        if(this.state.loggedin === true){  
            return <Redirect to="/personal-request"/>  
    }
        return(
           <Container fluid={true} className="container-edit">
               <Fade right>
               <Row style={{height:"auto"}}>
                   <Col md="5">
                   <div className="sidebox d-none d-sm-block">
                            <div className="d-none d-sm-block pt-5">
                            <br/><br/>
                            <br/><br/><br/><br/>
                            <br/><br/>
                                    <img src={logo} alt="" style={{marginLeft:"auto", marginRight:"auto", display:"block"}}/>
                                   
                                  
                                        
                            </div>
                   </div>
                   </Col>
                   <Col md="7" className="column-edit">
                   <div style={{width:"100%",overflowY:"auto",overflowX:"hidden",height:"100vh"}}>
                   <Row style={{padding:"10px"}}>
                        <Col xs="4" lg="4"><Link to="/takeImage"><FontAwesomeIcon icon={faChevronCircleLeft} size="3x" color="#283891"/></Link></Col>
                       
                    </Row>
                    
                    <Row className="justify-content-center">
                          <div className="col-10 sm-8 text-center br-28 cl-28 pt-2 pb-2 font-weight-bold">Face successfully Capture, Please continue to take your 2nd picture</div>
                      </Row>
                <Container>
                <Row className="justify-content-center mt-4">
                        <div className="NewScan-img"></div>
                    </Row>
                    <Row className="justify-content-center mt-3">
                          <div className="col-11 sm-9 helv pt-2 text-center img-2text">Press Continue to Take 2nd Picture</div>
                      </Row>          
                    
                      <Row className="justify-content-center mt-3">
                          <div className="col-11 sm-9 text-center col-white helv pt-2 pb-2 font-weight-bold bo-rd bc-4d">Continue</div>
                      </Row>
                </Container>

                   </div>
                   </Col>
               </Row>
               </Fade>
           </Container>
        );
    }
}