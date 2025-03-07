import React from 'react';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function TaskItem({ task, onPress, onDelete }) {
  console.log('Rendering task:', task);
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <Title>{task.title}</Title>
        <Paragraph>{task.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="delete"
          onPress={() => onDelete(task._id)}
        />
      </Card.Actions>
    </Card>
  );
}


const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
});
