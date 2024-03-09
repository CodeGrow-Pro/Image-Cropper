import React, { useState, Fragment, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import ReactCrop from 'react-image-crop';
import getCroppedImg from './CropImage';
import { Button } from '@mantine/core';

const FinalCropper = (props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [croppedImage, setCroppedImage] = useState(null);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                props.imgPath,
                croppedAreaPixels,
                rotation
            );
            // setCroppedImage(croppedImage);
            props.setIsTakePhotoByCamera(false)
            props.setCroppedImage(croppedImage)
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation]);

    return (
        <>
            <Cropper
                image={props.imgPath}
                crop={crop}
                zoom={zoom}
                aspect={16 / 16}
                onCropChange={setCrop}
                showGrid={true}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />
            <Button
                onClick={showCroppedImage}
                sx={{ height: "auto" }}
                p="sm"
            >
                Done
            </Button>
        </>


    )
}

function TakeImage(props) {
    const [playing, setPlaying] = useState(false)
    const [imgPath, setImgPath] = useState('')
    const [isCropping, setIsCropping] = useState(false)
    const [newImgPathBase64, setNewImgPathBase64] = useState('')
    const [crop, setCrop] = useState({ width: 300, height: 400 });

    const HEIGHT = 400;
    const WIDTH = HEIGHT / 4 * 3;

    navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    const startVideo = _ => {
        setIsCropping(false)
        setImgPath('')
        setPlaying(true)
        navigator.getUserMedia(
            {
                video: true,
            },
            (stream) => {
                let video = document.getElementsByClassName('app__videoFeed')[0];
                if (video) {
                    video.srcObject = stream;
                }
            },
            (err) => console.error(err)
        );
    }

    const stopVideo = _ => {
        setPlaying(false)
        let video = document.getElementsByClassName('app__videoFeed')[0];
        video.srcObject.getTracks()[0].stop();
    }

    const captureVideo = _ => {
        const canvas = document.createElement("CANVAS");
        var video = document.getElementsByClassName('app__videoFeed')[0];
        canvas.height = video.videoHeight;
        canvas.width = video.videoHeight / 4 * 3;
        canvas.getContext('2d').drawImage(video, (video.videoWidth - (video.videoHeight / 4 * 3)) / 2, 0, video.videoHeight / 4 * 3, video.videoHeight, 0, 0, video.videoHeight / 4 * 3, video.videoHeight);
        canvas.toBlob((blob) => {
            stopVideo()
            setImgPath(URL.createObjectURL(blob))
        }, 'image/jpeg', 0.95);
    }

    return (
        <div className='container-fluid'>
            <div className='row mt-4'>
                {
                    !imgPath && <div className='col-12 text-center'>
                        {playing && <div style={{
                            border: '2px dotted red',
                            position: 'absolute',
                            height: HEIGHT,
                            width: WIDTH,
                            left: 0,
                            right: 0,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                          
                        </div>}

                       { playing && <video
                            style={{ border: '1px solid white' }}
                            height={HEIGHT}
                            muted
                            autoPlay
                            className='app__videoFeed'
                        /> || <img src='https://gifsec.com/wp-content/uploads/2022/10/photography-gifs.gif'/>}
                    </div>
                }
            </div>
            <div className='row'>
                <div className='col-12 text-center mt-4'>
                    {
                        !playing &&
                        <button className='btn btn-primary' onClick={startVideo}>Start</button>
                        ||
                        <button className='btn btn-success' onClick={captureVideo}>Capture</button>
                    }
                    {
                        !playing && !!imgPath &&
                        <button className='btn btn-warning ml-2' onClick={() => setIsCropping(true)}>Crop</button>
                    }
                </div>
            </div>
            {imgPath && <FinalCropper imgPath={imgPath} setIsTakePhotoByCamera={props.setIsTakePhotoByCamera}
                setCroppedImage={props.setCroppedImage} />}
        </div>
    );
}

export default TakeImage;