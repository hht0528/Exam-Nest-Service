import { Injectable } from '@nestjs/common'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { UpdateSubjectDto } from './dto/update-subject.dto'
import { DbService } from '../db/db.service'

@Injectable()
export class SubjectService {
  constructor(private dbService: DbService) {}
  create(createSubjectDto: CreateSubjectDto) {
    return this.dbService.db.collection('subject').add(createSubjectDto)
  }

  find(findParams: object) {
    return this.dbService.db.collection('subject').where(findParams).get()
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`
  }

  remove(id: number) {
    return `This action removes a #${id} subject`
  }
}
