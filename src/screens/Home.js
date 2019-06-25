import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text, View} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PhotoGrid from 'react-native-image-grid';
import { getImages } from '../redux/actions';

class HomeScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
          backgroundColor: '#3F51B5'
        },
        headerLeft: (<View/>),
        headerTitle: () => (
          <View style={styles.headerWrapper}>
            <Text
              adjustsFontSizeToFit
              style={styles.headerText}>Item List</Text>
          </View>
        ),
        headerRight: (<View/>)
    }
    constructor(props){
        super(props);
        this.state = { imageList: [] };
    }

    componentDidMount() {
        // Build an array of 60 photos
        // let items = Array.apply(null, Array(2)).map((v, i) => {
        //   return { id: i, imgsrc: 'http://s3.ap-south-1.amazonaws.com/w2k-img/1e13a2ce-86d5-43ca-9133-900a589a9086.jpg' }
        // });
        // this.setState({ imageList: items });
        this.getImagesList();
    }

    getImagesList=() => {
      this.props.getImages({lat: 0, long: 0, page: 1}).then(res => {
        let items = res.payload.data.assetslist.map(element => {
          return {id: element.id, imgsrc: 'http://' + element.imgsrc}
        });
        this.setState({
          imageList: items || []
        });
      }, error => {
        console.log('error', error)
      });

    }

    renderHeader=() =>{
        return(
          <Text>I'm on top.......! </Text>
        );
    }

    renderItem(item, itemSize, itemPaddingHorizontal) {
        return(
          <TouchableOpacity
            key = { item.id }
            style = {{ width: itemSize, height: itemSize, paddingHorizontal: itemPaddingHorizontal }}
            onPress = { () => {
              // Do Something
            }}>
            <Image
              resizeMode = "cover"
              style = {{ flex: 1 }}
              source = {{ uri: item.imgsrc }}
            />
          </TouchableOpacity>
        )
    }

    render(){
      // console.log('imageList...', this.state.imageList);
        return(
            <PhotoGrid
                data = { this.state.imageList }
                itemsPerRow = { 3 }
                itemMargin = { 1 }
                itemPaddingHorizontal={1}
                renderHeader = { this.renderHeader }
                renderItem = { this.renderItem }
            />
        );
    }
}
const styles = StyleSheet.create({
    headerWrapper: {
      flex: 1
    },
    headerText: {
      textAlign: 'center', // ok
      alignSelf: 'center', // ok
    }
});

function mapStateToProps(state) {
  return { imageListInfo: state.imageListInfo };
}

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      getImages
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);