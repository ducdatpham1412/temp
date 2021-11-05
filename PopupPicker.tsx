/* eslint-disable no-underscore-dangle */
import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Themes } from 'assets/themes';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledText, StyledTouchable } from 'components/base';
import Metrics from 'assets/metrics';
import { isIos } from 'utilities/helper';

interface Props {
    data: Array<any>;
    currentPropsIndex: any;
    containerHeight?: number;
    itemHeight?: number;
    customContainerStyle?: StyleProp<ViewStyle>;
    customChooseStyle?: StyleProp<ViewStyle>;
    customItemStyle?: StyleProp<ViewStyle>;
    activeColor?: string;
    inactiveColor?: string;
    handleCancel(): void;
    handleConfirm(curIndex: any): void;
}

const PopupPicker = (props: Props) => {
    const { handleCancel, handleConfirm } = props;
    const scrollViewRef = useRef<any>();
    const {
        data,
        currentPropsIndex,
        containerHeight = Metrics.screenHeight / 3,
        itemHeight = Metrics.screenHeight * 0.06,
        customContainerStyle = {},
        customChooseStyle = {},
        customItemStyle = {},
        activeColor = Themes.COLORS.dark,
        inactiveColor = Themes.COLORS.grey,
    } = props;
    const [currentIndex, setCurrentIndex] = useState(currentPropsIndex);

    useEffect(() => {
        scrollViewRef?.current?.scrollTo({ y: currentPropsIndex * itemHeight, animated: false });
        if (currentPropsIndex !== currentIndex) {
            setCurrentIndex(currentPropsIndex);
        }
    }, [currentPropsIndex]);

    // const numsOfVisibleItems = Math.floor(containerHeight / itemHeight);

    return (
        <View>
            <View style={styles.contBtnGroup}>
                <StyledTouchable
                    customStyle={styles.contBtnLink}
                    onPress={() => {
                        handleCancel();
                    }}
                >
                    <StyledText i18nText="common.cancel" customStyle={styles.txtLink} />
                </StyledTouchable>
                <StyledText i18nText="common.picker.pickItem" customStyle={styles.txtHeader} />
                <StyledTouchable
                    customStyle={styles.contBtnLink}
                    onPress={() => {
                        handleConfirm(currentIndex);
                    }}
                >
                    <StyledText i18nText="common.picker.confirm" customStyle={styles.txtLink} />
                </StyledTouchable>
            </View>

            <View style={[styles.container, customContainerStyle, { height: containerHeight }]}>
                <View
                    style={[
                        styles.contChoose,
                        customChooseStyle,
                        { height: itemHeight, top: containerHeight / 2 - itemHeight / 2 },
                    ]}
                    pointerEvents="none"
                />
                <ScrollView
                    ref={scrollViewRef as any}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingTop: containerHeight / 2 - itemHeight / 2,
                        paddingBottom: containerHeight / 2 - itemHeight / 2,
                    }}
                    scrollEventThrottle={16}
                    snapToInterval={itemHeight}
                    decelerationRate="fast"
                    onScroll={(event) => {
                        const newIndex = Math.round(event?.nativeEvent?.contentOffset?.y / itemHeight);
                        setCurrentIndex(newIndex);
                    }}
                    snapToOffsets={data.map((_, index) => index * itemHeight)}
                    scrollEnabled={true}
                >
                    {data.map((item, index) => {
                        const rotationDegree = new Animated.Value(0);
                        // let rotationDegree = new Animated.Value(0);
                        // if (
                        //     currentIndex + Math.floor(numsOfVisibleItems / 2) <= index ||
                        //     currentIndex - Math.floor(numsOfVisibleItems / 2) >= index
                        // ) {
                        //     rotationDegree = new Animated.Value(Math.PI / 4);
                        // }
                        return (
                            <Animated.View
                                key={index}
                                style={[
                                    styles.contItemView,
                                    customItemStyle,
                                    { height: itemHeight },
                                    {
                                        transform: [
                                            {
                                                rotateX: isIos
                                                    ? rotationDegree
                                                    : `${(rotationDegree as any)._value}deg`,
                                            },
                                        ],
                                    },
                                ]}
                            >
                                <StyledTouchable
                                    customStyle={[styles.contItemButton]}
                                    onPress={() => console.log('Hello')}
                                    disabled={index !== currentIndex}
                                >
                                    <StyledText
                                        originValue={item?.name || ''}
                                        customStyle={{
                                            color: index === currentIndex ? activeColor : inactiveColor,
                                            marginLeft: 10,
                                            fontSize: 16,
                                        }}
                                    />
                                </StyledTouchable>
                            </Animated.View>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {},
    contBtnGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    contBtnLink: {
        padding: 10,
    },
    txtLink: {
        color: Themes.COLORS.textLink,
        fontSize: 16,
    },
    txtHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contChoose: {
        position: 'absolute',
        width: Metrics.screenWidth,
        backgroundColor: Themes.COLORS.grey,
        zIndex: 1,
        opacity: 0.3,
    },
    contItemView: {
        width: Metrics.screenWidth * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contItemButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: Metrics.screenWidth,
    },
});
export default PopupPicker;
