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

  update(second_id: string, updateSubjectDto: UpdateSubjectDto) {
    return this.dbService.db.collection('subject').doc(second_id).update(updateSubjectDto)
  }

  remove(second_id: string) {
    return this.dbService.db.collection('subject').doc(second_id).remove()
  }
}
