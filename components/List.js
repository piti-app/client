import React, { Component } from 'react'
import { View } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";
import {Text,ListItem,Left,Button,Right,Icon,Body} from "native-base";
import { Image } from 'react-native'
export class List extends Component {
  render() {
    return (
      <ListItem icon>
      <Left>
        {/* <Button style={{ backgroundColor: this.props.color }}> */}
          <Image source={this.props.url} style={{ height:30, width :30, resizeMode:'contain' }}/>
        {/* </Button> */}
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