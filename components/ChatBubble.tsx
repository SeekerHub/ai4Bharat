import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
};

type Props = {
    message: Message;
};

export function ChatBubble({ message }: Props) {
    const colorScheme = useColorScheme() ?? 'dark';
    const colors = Colors[colorScheme];
    const isUser = message.role === 'user';

    const timeStr = message.timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <View style={[styles.wrapper, isUser ? styles.userWrapper : styles.aiWrapper]}>
            {!isUser && (
                <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
                    <Text style={styles.avatarText}>AI</Text>
                </View>
            )}
            <View style={styles.bubbleColumn}>
                <View
                    style={[
                        styles.bubble,
                        {
                            backgroundColor: isUser ? colors.userBubble : colors.aiBubble,
                            borderBottomRightRadius: isUser ? 4 : 20,
                            borderBottomLeftRadius: isUser ? 20 : 4,
                            borderWidth: isUser ? 0 : 1,
                            borderColor: colors.border,
                        },
                    ]}>
                    <Text
                        style={[
                            styles.text,
                            { color: isUser ? colors.userBubbleText : colors.aiBubbleText },
                        ]}>
                        {message.content}
                    </Text>
                </View>
                <Text style={[styles.time, { color: colors.subtext }]}>{timeStr}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginVertical: 6,
        paddingHorizontal: 12,
        alignItems: 'flex-end',
    },
    userWrapper: {
        justifyContent: 'flex-end',
    },
    aiWrapper: {
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        marginBottom: 18,
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
    },
    bubbleColumn: {
        maxWidth: '75%',
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    text: {
        fontSize: 15,
        lineHeight: 22,
    },
    time: {
        fontSize: 11,
        marginTop: 4,
        marginHorizontal: 4,
        alignSelf: 'flex-end',
    },
});
