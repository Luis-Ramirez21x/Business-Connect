import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Form,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import "./index.css";

// IMAGE IMPORTS
import image from '../../images/site_img02.png';
import footerLogo from '../../images/bc_logo_w.png';
import icon1 from "../../images/twitter.png";
import icon2 from "../../images/instagram.png";
import icon3 from "../../images/facebook.png";
import icon4 from "../../images/linkedin.png";

import {
  ALL_TAGS,
  BUSINESSES_BY_TAG,
  BUSINESS_SEARCH,
} from "../../utils/queries";
import { BusinessList } from "../../components/BusinessList";

import { useQuery, useLazyQuery } from "@apollo/client";


const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchContent, setSearchContent] = useState([]);
  const [tagInput, setTagInput] = useState("Select A Category");

  const { loading: tag_loading, data: tag_data } = useQuery(ALL_TAGS);
  const [searchBusinesses] = useLazyQuery(BUSINESS_SEARCH, {
    variables: { query: searchInput },
  });
  const [loadBusinesses] = useLazyQuery(BUSINESSES_BY_TAG, {
    variables: { name: tagInput },
  });

  const callLoadBusiness = async () => {
    try {
      const { data: business_data } = await loadBusinesses();
      if (business_data) {
        setSearchContent(business_data.tag.businesses);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBusinessSearch = async (event) => {
    event.preventDefault();
    try {
      const { data: business_data } = await searchBusinesses();
      if (business_data) {
        setSearchContent(business_data.businessSearch);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="parallax"></div>

      <div className="top-banner-container">
        <div className="top-info-text">
          <h1 id="top-banner-text">
            Find the services you need in an instant.
          </h1>
          <p>
            Get all the help you need with a simple search. We can connect you
            with a wide range of services with upfront pricing and instant
            booking for daycare, cleaning and more.
          </p>
        </div>
      </div>

      <Container className="search-container-main">
        <Form onSubmit={handleBusinessSearch} className="form-main">
          <h2>Start Searching For Businesses</h2>
          <Form.Row className="search-main">
            <Col xs={12} md={8}>
              <Form.Control
                className="input-main"
                name="searchBar"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                size="lg"
                placeholder="Search by keywords here"
              />
            </Col>
            <Col xs={12} md={1}>

              <Button className='search-btn-main' type='submit' variant='primary' size='lg'>Search</Button>

            </Col>
          </Form.Row>
        </Form>
      </Container>

      <Container className="cat-search">

        <h2 className="cat-header">You May Also Choose A Category Here </h2>
          <DropdownButton
            className="drop-down-btn"
            size="lg"
            id="dropdown-basic-button"
            title={tagInput}
            value={tagInput}
            onSelect={(eventKey, event) => setTagInput(eventKey)}>
              
            {tag_loading ? (
              <DropdownItem>loading...</DropdownItem>
            ) : (
              tag_data.tags.map((tag) => {
                
              return (
                <DropdownItem eventKey={tag.name} key={tag.name} value>
                  {tag.name}
                </DropdownItem>
              );
            })
          )}
        </DropdownButton>
        <Button className='cat-search-btn' onClick={callLoadBusiness}>Search</Button>
      </Container>

      <Container>
        {searchContent.length ? (
          searchContent.map((business) => {
            return (
              <BusinessList
                key={business.name}
                business={business}
              ></BusinessList>
            );
          })
        ) : (
          <h3>Start by Searching for A Category</h3>
        )}
      </Container>

      <Container className="bot-banner-container">
        <img className="bot-banner-img" src={image}></img>
        <div className="bot-info-text">
          
          <h1>Get Connected Today!</h1>
            <p>Users from all over the US use The Business Connect Network to match with the highest rated services in their area. Signup now to get connected with amazing businesses today.</p>

        </div>
      </Container>

      <div className="container-fluid footer-content">
        <h3 className="footer-header">Resource Links</h3>
          <ul className="footer-resource-section">
          <a className="active-resource-link" href="#" alt="link1"><li className="resource-link"> About Us</li></a>
          <a className="active-resource-link" href="#" alt="link2"><li className="resource-link"> Meet our Team</li></a>
          <a className="active-resource-link" href="#" alt="link3"><li className="resource-link"> Contact Us</li></a>
          <a className="active-resource-link" href="#" alt="link4"><li className="resource-link"> FAQs</li></a>
          </ul>

          <div className="footer-icon-main">
          <a href="#" alt="icon-link1"><img className="footer-icon" src={icon1}></img></a>
          <a href="#" alt="icon-link2"><img className="footer-icon" src={icon2}></img></a>
          <a href="#" alt="icon-link3"><img className="footer-icon" src={icon3}></img></a>
          <a href="#" alt="icon-link4"><img className="footer-icon" src={icon4}></img></a>
          </div>

          <div>
            <img className="footer-logo" src={footerLogo}></img>
          </div>
      </div>

      {/* <Container className="container-fluid">
        <div className="footer-content">
        <h1>Footer Content</h1>
        </div>
      </Container> */}
    </>
  );
};

export default Home;
