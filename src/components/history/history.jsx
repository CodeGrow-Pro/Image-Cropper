import { SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import classes from './history.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const mockdata = [
  {
    title: 'Top 10 places to visit in Norway this summer',
    image:
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 18, 2022',
  },
  {
    title: 'Best forests to visit in North America',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 27, 2022',
  },
  {
    title: 'Hawaii beaches review: better than you think',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 9, 2022',
  },
  {
    title: 'Mountains at night: 12 best locations to enjoy the view',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 12, 2022',
  },
];

export function History() {
  const [photos, setPhotos] = useState([])
  const getAllPhotos = async () => {
    try {
      await axios.get('http://localhost:3312/gallary/v1/photos/filter?userId=63e1532bac33633a3df896e3').then((result) => {
        if (result.data.Photos) {
          setPhotos(result?.data?.Photos)
        }
      })
    } catch (error) {

    }
  }

  useEffect(() => {
    getAllPhotos()
  }, [])
  return (
    <section>
      <div class="main-container">
        <ul class="grid-wrapper">
          {
            photos?.map((photo, index) => {
              return <div>
                <img src={photo?.imagesPath} />
                <p>image {index + 1}</p>
              </div>
            })
          }
        </ul>
        {photos?.length == 0 && <h3>Cropped Image Not found!</h3>}
      </div>
    </section>
  );
}