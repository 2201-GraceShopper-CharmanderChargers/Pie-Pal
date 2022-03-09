/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { updateThisPizza } from '../../store/pizzas';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { Row, Col, FloatingLabel, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const AdminOnePizzaEdit = (props) => {
  const [pizza, setPizza] = useState({});
  const [newPizza, editPizza] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPizza() {
      try {
        const res = await axios.get(`/api/pizzas/${props.match.params.id}`);
        const info = res.data;
        setPizza(info);
      } catch (error) {
        console.log('there was a problem');
      }
    }
    getPizza();
  }, []);

  useEffect(() => {
    async function editing() {
      const res = await axios.put(`/api/pizzas/${pizza.id}`, {
        pizza,
      });
      const replace = res.data;
    }
    editing();
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    dispatch(updateThisPizza({ ...pizza }, { ...pizza }));
  };

  return (
    <div className="adminOnePizza">
      <img src={pizza.imageUrl} />
      <Card id="editpizzacard">
        <Form onSubmit={() => editPizza()} className="editpizzatotalform">
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Edit Pizza Name</Form.Label>
                <FloatingLabel column="lg" lg={5} label={pizza.name}>
                  <FormControl
                    name="pizza name"
                    type="text"
                    placeholder={pizza.name}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Edit Origin Of Pizza</Form.Label>
                <FloatingLabel column="lg" lg={5} label={pizza.cityOfPizza}>
                  <FormControl
                    name="pizza name"
                    type="text"
                    placeholder={pizza.cityOfPizza}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Edit Price</Form.Label>
                <FloatingLabel column="lg" lg={5} label={pizza.price}>
                  <FormControl
                    name="pizza name"
                    type="number"
                    placeholder={pizza.price}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Form.Group>
              <Form.Label>Edit Description</Form.Label>
              <FloatingLabel column="lg" lg={5} label={pizza.description}>
                <FormControl
                  name="pizza name"
                  as="textarea"
                  rows={5}
                  placeholder={pizza.description}
                />
              </FloatingLabel>
            </Form.Group>
            <Col>
              <Form.Group>
                <Form.Label>Edit Image</Form.Label>
                <FloatingLabel column="lg" lg={5} label="Image Url">
                  <FormControl
                    name="pizza name"
                    type="text"
                    placeholder="Image Url"
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="danger" type="submit" id="editpizzabutton">
            Edit
          </Button>
        </Form>
      </Card>
    </div>
  );
};
