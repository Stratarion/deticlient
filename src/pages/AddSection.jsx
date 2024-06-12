import React, { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { createSection } from 'actions/sections';
import { Input } from "uikit";
import { uploadImage } from "actions/upload";
import { MainLayout } from "layouts";


export default function AddSectionPage () {
  const [name, setName] = useState("");
  const [maxCount, setMaxCount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [costInfo, setCostInfo] = useState("");
  const [owner, setOwner] = useState("");
  const [geo, setGeo] = useState('0, 0');
  // const [address, setAddress] = useState('');
  // const [telefon, setTelefon] = useState('');
  // const [email, setEmail] = useState('');
  // const [web, setWeb] = useState('');
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const clearForm = () => {
    setName('');
    setMaxCount('');
    setDescription('');
    setType('');
    setCostInfo('');
    setOwner('');
    setGeo('0, 0');
  }

  const handleSubmit = async (e) => {
    
    console.log('reg');
    const geoArray = geo.trim().split(",");
    const reqBody = {
        name,
        maxCount,
        description,
        type,
        costInfo,
        owner,
        geo: geoArray,
    }

    dispatch(createSection(reqBody));
    clearForm();
    e.preventDefault();
  }

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append("avatar", image);
      dispatch(uploadImage(data)).then((res) => {
        setAvatar(res?.data?.path);
      });
    } catch (error) {
      
    }
  }, [image, dispatch])
  return (
    <MainLayout className="registration">
      <div>Добавление секции</div>
      <form className="registration-form" onSubmit={(e) => handleSubmit(e)}>
        <label>
          Название:
          <Input type="text" value={name} onChange={(e) =>setName(e.target.value)} />
        </label>
        <label>
          Максимальная численносить группы:
          <Input type="text" value={maxCount} onChange={(e) =>setMaxCount(e.target.value)} />
        </label>
        <label>
          Описание:
          <Input type="text" value={description} onChange={(e) =>setDescription(e.target.value)} />
        </label>
        <label>
          Тип секции:
          <Input type="text" value={type} onChange={(e) =>setType(e.target.value)} />
        </label>
        <label>
          Стоимость:
          <Input type="text" value={costInfo} onChange={(e) =>setCostInfo(e.target.value)} />
        </label>
        <label>
          Владелец (userId):
          <Input type="text" value={owner} onChange={(e) =>setOwner(e.target.value)} />
        </label>
        <label>
          Кординаты (2 цифры):
          <Input type="text" value={geo} onChange={(e) =>setGeo(e.target.value)} />
        </label>

        <input className="registration-form-submit" type="submit" value="Submit" />
      </form>
    </MainLayout>
  )
}