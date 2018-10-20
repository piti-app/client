import React, { Component } from 'react'
import { View } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";
import {Text } from "native-base";
export class List extends Component {
  render() {
    return (
        <Grid>
            <Col style={{borderRightWidth:0.5}}>
                <Text style={{marginRight:10}}>
                {this.props.type}
            </Text>
            </Col>
            <Col>
                <Text style={{marginLeft:30}}>
           Rp. {this.props.content}
            </Text>
            </Col>
      </Grid>  
    )
  }
}

export default List