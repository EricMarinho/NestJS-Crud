import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(CityEntity)
    readonly cityRepository: Repository<CityEntity>
  ){}

  create(createCityDto: CreateCityDto) {
    const data = this.cityRepository.create(createCityDto);
    return this.cityRepository.save(data);
  }

  findAll() {
    return this.cityRepository.find({
      relations: ['state']
    });
  }

  findOne(id: string) {
    return this.cityRepository.findOne(
      {
        where: {id},
        relations: ['state']
      },
    )
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    const data = this.cityRepository.create(updateCityDto);
    await this.cityRepository.update({id}, data);
    return this.cityRepository.findOne({where: {id}});
  }

  async remove(id: string) {
    const data = await this.cityRepository.findOne({where: {id}});
    return this.cityRepository.remove(data);
  }
}
