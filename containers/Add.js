import React, { Component } from 'react';
import { Container, Label, Content, Form, Item, 
  Text, Input, Textarea, Button, DatePicker } from 'native-base';
import { StyleSheet } from 'react-native'

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  render() {
    return (
        <Container>
          <Text style={styles.title}>ADD EXPENSE</Text>
          <Content style={styles.main}>
            <Form>
              <Item regular style={styles.mb10}>
                <Input placeholder='Type' />
              </Item>
              <Item regular style={styles.mb10}>
                <Input placeholder='Price' />
              </Item>
              <Item regular style={styles.mb10}>
                <DatePicker
                  defaultDate={new Date()}
                  locale={"en"}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select date"
                  onDateChange={this.setDate}
                  style={styles.mb10}
                  />
              </Item>
              <Textarea 
                rowSpan={5} 
                style={styles.mb10}
                bordered placeholder="Description" />
              <Button block light>
                <Text>Save Expense</Text>
              </Button>
            </Form>
          </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    padding: 10
  },
  mb10: {
    marginBottom: 10
  },
  title: {
    fontSize: 32,
    fontFamily : 'bebaskai',
    textAlign : 'center',
    paddingTop: 20,
    paddingBottom: 20,
  }
})

export default Add;