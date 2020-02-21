import React, {Component} from 'react'
import {
    Platform,
    Modal,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native'


import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import commonStyles from '../commonStyles'
const initialState = {desc: '', date: new Date(), showDatePicker: false}
export default class AddTask extends Component {
    state = {
        ...initialState
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date} onChange={(_,date) => this.setState({date, showDatePicker :false})} mode='date'/>
        const dateString = moment(this.state.date).format('ddd,D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}> 
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }
    render(){
        return(
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                        <Text style={styles.header}> Nova Tarefa </Text>
                        <TextInput style={styles.input} placeholder={"Informe a descrição"} onChangeText={desc => this.setState({desc})} value={this.state.desc}/>
                        {this.getDatePicker()}
                        <View style={styles.buttons}> 
                            <TouchableOpacity>
                                <Text style={styles.button} onPress={this.props.onCancel}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}>
                    
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    }, 
    container:{
        backgroundColor: '#FFF'
    },
    header:{
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    input:{
        fontFamily:commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius:6
    },
    button:{
        margin:20,
        marginRight:30,
        color:commonStyles.colors.today
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        fontSize:20,
        marginLeft: 15
    }
})