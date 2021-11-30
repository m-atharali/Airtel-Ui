import React from "react";
import "../assets/Style/personal.css";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Cropper from "react-easy-crop";
import $ from "jquery";
import Bottom from "./Common/Bottom";

var link = require("../assets/Lead-images/Afritech-logo.png");

export default class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NIN: false,
      BVN: false,
      date: new Date(),
      loader: false,
      loggedin: false,
      imgName: "",
      firstName: "",
      lastName: "",
      middlename: "",
      tracking: "",
      dob: "",
      nin: "",
      phone: "",
      image: "",
      image1: "",
      crop: { x: 1, y: 1 },
      zoom: 1.5,
      File1: "",
      File2: "",
      File3: "",
      signature: "",
      title: "",
      gender: "",
      maritalStatus: "",
      ConfideneceLevel: "",
      PAS: false,
      ref: "",
      exp: "",
      issuePlace: "",
      issueDate: "",
      TIN: false,
      Tin: "",
      phone: "",
      reg_no: "",
      email: "",
      tax_office: "",
      entity: "",
      birthstate: "",
      birthcountry: "",
      educationallevel: "",
      emplymentstatus: "",
      maritalstatus: "",
      ninL: "",
      nok_address1: "",
      nok_firstname: "",
      nok_lga: "",
      nok_state: "",
      nok_surname: "",
      nok_town: "",
      nspokenlang: "",
      religion: "",
      residence_AdressLine1: "",
      residence_Town: "",
      residence_lga: "",
      residence_state: "",
      residencestatus: "",
      self_origin_lga: "",
      self_origin_place: "",
      self_origin_state: "",
      telephoneno: "",
    };
  }
  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  onZoomChange = (zoom) => {
    this.setState({ zoom });
  };
  componentDidMount() {
    const log = sessionStorage.getItem("agentLogin");
    const logData = JSON.parse(log);
    if (logData !== true) {
      this.props.history.push("/");
    } else {
      const storage1 = sessionStorage.getItem("auth");
      const data = JSON.parse(storage1);

      this.setState({
        NIN: true,
        imgName: "NIN",
        firstName: data.firstname || "",
        lastName: data.surname || "",
        dob: data.birthdate || "",
        nin: data.nin || "",
        image: data.picture || "",
        signature: data.signature || "",
        title: data.title || "",
        gender: data.gender || "",
        maritalStatus: data.maritalstatus || "",
        tracking: data.trackingId || "",
        middlename: data.middlename || "",

        birthcountry: data.birthcountry || "",
        birthstate: data.birthstate || "",
        educationallevel: data.educationallevel || "",
        emplymentstatus: data.emplymentstatus || "",
        maritalstatus: data.maritalstatus || "",
        nin: data.nin || "",
        nok_address1: data.nok_address1 || "",
        nok_firstname: data.nok_firstname || "",
        nok_lga: data.nok_lga || "",
        nok_state: data.nok_state || "",
        nok_surname: data.nok_surname || "",
        nok_town: data.nok_town || "",
        nspokenlang: data.nspokenlang || "",
        religion: data.religion || "",
        residence_AdressLine1: data.residence_AdressLine1 || "",
        residence_Town: data.residence_Town || "",
        residence_lga: data.residence_lga || "",
        residence_state: data.residence_state || "",
        residencestatus: data.residencestatus || "",
        self_origin_lga: data.self_origin_lga || "",
        self_origin_place: data.self_origin_place || "",
        self_origin_state: data.self_origin_state || "",
        telephoneno: data.telephoneno || "",
      });
    }
  }

  Print = () => {
    var restorepage = $("body").html();
    var printcontent = $("#printable").clone();

    $("body").empty().append(printcontent);
    window.print();
    $("body").html(restorepage);
  };

  render() {
    return (
      <>
        <Container fluid={true} className="container-edit">
          <Row className="justify-content-center">
            <Col md="10" className="column-edit" style={{ height: "auto" }}>
              <Row style={{ padding: "10px" }}>
                <Col xs="4" lg="4">
                  <Link to="/nin">
                    <FontAwesomeIcon
                      icon={faChevronCircleLeft}
                      size="3x"
                      color="#04478a"
                    />
                  </Link>
                </Col>
                <Col xs="2" lg="2" className="desktop"></Col>
                <Col xs="3" lg="4"></Col>
                <Col xs="3" lg="2" className="desktop">
                  {" "}
                  <img
                    src={link}
                    className="bg-light p-2 mr-2"
                    style={{ width: "150px" }}
                  />
                </Col>
              </Row>
              <div id="printable">
                <Row className="justify-content-center">
                  <div className="col-10  text-center col-white helv font-weight-bold bc-28 text-conf">
                    Matched
                  </div>
                </Row>

                <Row className="justify-content-center mt-2">
                  <div className="col-10">
                    <Row className="justify-content-between">
                      <div className="col-6 col-sm-3">
                        {this.state.image && (
                          <>
                            <div className="col text-center pb-2 img-fo">
                              {this.state.imgName} Image
                            </div>
                            <div className="conf-img">
                              <img
                                className="img-con"
                                src={`data:image/png;base64,${this.state.image}`}
                              />
                            </div>
                          </>
                        )}
                      </div>

                      <div className="col-6 col-sm-3">
                        {this.state.signature && (
                          <>
                            <div className="col text-center pb-2 img-fo">
                              Signature
                            </div>
                            <div className="conf-img">
                              <img
                                className="img-local"
                                src={`data:image/png;base64,${this.state.signature}`}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </Row>
                    {/* NIN Data */}
                    {this.state.NIN === true && (
                      <>
                        <div className="row mt-2">
                          <div className="col-6">
                            <label className="label-col">Title</label>
                            {this.state.title && (
                              <div type="text" className="form-control bc-e1">
                                {this.state.title}
                              </div>
                            )}
                            {!this.state.title && (
                              <input
                                type="text"
                                className="form-control "
                              ></input>
                            )}
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">First Name</label>
                            {this.state.firstName && (
                              <div type="text" className="form-control bc-e1">
                                {this.state.firstName}
                              </div>
                            )}
                            {!this.state.firstName && (
                              <input
                                type="text"
                                className="form-control "
                              ></input>
                            )}
                          </div>
                          <div className="col">
                            <label className="label-col">Middle Name</label>
                            {this.state.middlename && (
                              <div type="text" className="form-control bc-e1">
                                {this.state.middlename}
                              </div>
                            )}
                            {!this.state.middlename && (
                              <input
                                type="text"
                                className="form-control "
                              ></input>
                            )}
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">Surname</label>
                            {this.state.lastName && (
                              <div type="text" className="form-control bc-e1">
                                {this.state.lastName}
                              </div>
                            )}
                            {!this.state.lastName && (
                              <input
                                type="text"
                                className="form-control "
                              ></input>
                            )}
                          </div>
                          <div className="col">
                            <label className="label-col">Gender</label>
                            {this.state.gender && (
                              <div type="text" className="form-control bc-e1">
                                {this.state.gender}
                              </div>
                            )}
                            {!this.state.gender && (
                              <input
                                type="text"
                                className="form-control "
                              ></input>
                            )}
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">Date of Birth</label>
                            {this.state.dob && (
                              <div type="text" className="form-control bc-e1">
                                {this.state.dob}
                              </div>
                            )}
                            {!this.state.dob && (
                              <input
                                type="text"
                                className="form-control "
                              ></input>
                            )}
                          </div>
                          <div className="col">
                            <label className="label-col">
                              NIMC TRACKING ID
                            </label>
                            {this.state.tracking && (
                              <div type="text" className="form-control bc-e1">
                                {this.state.tracking}
                              </div>
                            )}
                            {!this.state.tracking && (
                              <input
                                type="text"
                                className="form-control "
                              ></input>
                            )}
                          </div>
                        </div>
                        {/* ........... */}
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">Birth Country</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.birthcountry}
                            </div>
                          </div>
                          <div className="col">
                            <label className="label-col">Birth State</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.birthstate}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">Religion</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.religion}
                            </div>
                          </div>
                          <div className="col">
                            <label className="label-col">
                              Emplyment Status
                            </label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.emplymentstatus}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">
                              Educational Level
                            </label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.educationallevel}
                            </div>
                          </div>
                          <div className="col">
                            <label className="label-col">Marital Status</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.maritalstatus}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">NIN</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.nin}
                            </div>
                          </div>
                          <div className="col">
                            <label className="label-col">Telephoneno</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.telephoneno}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">
                              Residence Adress
                            </label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.residence_AdressLine1}
                            </div>
                          </div>
                          <div className="col">
                            <label className="label-col">Residence Town</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.residence_Town}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">Residence State</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.residence_state}
                            </div>
                          </div>
                          <div className="col">
                            <label className="label-col">
                              Residence Status
                            </label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.residencestatus}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">Residence LGA</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.residence_lga}
                            </div>
                          </div>
                          <div className="col">
                            <label className="label-col">Self Origin LGA</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.self_origin_lga}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">
                              Self Origin Place
                            </label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.self_origin_place}
                            </div>
                          </div>
                          <div className="col">
                            <label className="label-col">
                              Self Origin State
                            </label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.self_origin_state}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">NOK First Name</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.nok_firstname}
                            </div>
                          </div>
                          <div className="col">
                            <label className="label-col">NOK Surname</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.nok_surname}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">NOK LGA</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.nok_lga}
                            </div>
                          </div>
                          <div className="col">
                            <label className="label-col">NOK State</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.nok_state}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">NOK Address</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.nok_address1}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col">
                            <label className="label-col">NOK Town</label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.nok_town}
                            </div>
                          </div>
                          <div className="col">
                            <label className="label-col">
                              National Spoken language
                            </label>

                            <div type="text" className="form-control bc-e1">
                              {this.state.nspokenlang}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <Row className="justify-content-end mt-3 mb-5">
                      <div className="col-6 col-sm-2" onClick={this.Print}>
                        <button className="btn btn-bio">Print</button>
                      </div>
                    </Row>
                  </div>
                </Row>

                <Bottom />
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
