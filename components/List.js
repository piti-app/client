import React, { Component } from 'react'
import { View } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";
import {Text,ListItem,Left,Button,Right,Icon,Body} from "native-base";
export class List extends Component {
  render() {
    return (
      <ListItem icon>
      <Left>
        <Button style={{ backgroundColor: this.props.color }}>
          <Icon active name="bluetooth" />
        </Button>
      </Left>
      <Body>
        <Text>{this.props.type}</Text>
      </Body>
      <Right>                    
        <Text>Rp.{this.props.value}</Text>
      </Right>
    </ListItem>
    )
  }
}

export default List