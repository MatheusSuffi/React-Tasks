import React from 'react'

import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'

export default props => {
    return (
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    )
}