import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'


import { exerciseOption, fetchData, youtubeOptions } from '../utils/fetchData'
import Detail from '../components/Detail'
import ExerciseVideo from '../components/ExerciseVideo'
import SimilarExercise from '../components/SimilarExercise'

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [name, setName] = useState("")

  const {id} = useParams();

  useEffect(()=>{
      const fetchExerciseData = async () => {
          const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
          const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

        const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOption);
        setExerciseDetail(exerciseDetailData);
        setName(exerciseDetailData.name)

   
        const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions);
        setExerciseVideos(exerciseVideosData.contents);
      }
      fetchExerciseData();
  }, [id])

  return (
    <Box>
        <Detail exerciseDetail={exerciseDetail} />
        <ExerciseVideo exerciseVideos={exerciseVideos} name={name} />
        <SimilarExercise />
    </Box>
  )
}

export default ExerciseDetail
