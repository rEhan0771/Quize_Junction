import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { AppColor } from "../../utils/AppColor";
import { AppImage } from "../../utils/AppImage";


const LeaderCard = ({ leaderData, index }) => {

    return (
        <View style={{
            width: '100%', marginTop: 5, height: 100, backgroundColor: 'white',
            alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '40%', }}>
                <Image
                    source={AppImage.profile}
                    style={{ width: 40, height: 40, resizeMode: 'contain', marginLeft: 12 }}
                />
                <Text style={{ marginLeft: 12, fontSize: 16, color: AppColor.primary }}>{leaderData?.user_data?.firstName + " " + leaderData?.user_data?.lastName}</Text>
            </View>
            <View style={{ justifyContent: 'space-evenly', marginRight: 10, height: '100%', width: '45%', }}>
                <Text>Score: {((leaderData?.correctAttempt / 10) * 100).toFixed(2)}%</Text>
                <Text>Time: {(leaderData?.completedInTime / 60).toFixed(2)} mins</Text>
                <Text>Category: {leaderData?.category}</Text>
            </View>
        </View>
    )
}

export default LeaderCard;