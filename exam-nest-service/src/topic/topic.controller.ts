import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TopicService } from './topic.service'
import { CreateTopicDto, FindTopicDto } from './dto/create-topic.dto'
import { UpdateTopicDto } from './dto/update-topic.dto'
import { DbCreateData, DbDeleteData, DbFindData, DbUpdate } from 'src/db/type'
import { HttpRes } from 'src/types/httpRes'
import { SubjectService } from 'src/subject/subject.service'

@Controller('topic')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private subjectService: SubjectService,
  ) {}
  /**
   * 添加二级学科题目
   * @param createTopicDto
   * @returns
   */
  @Post('/create')
  async create(@Body() createTopicDto: CreateTopicDto) {
    const { sub_second_id } = createTopicDto
    const findCount = await this.topicService.findAll({ sub_second_id })

    if (!findCount.total) {
      console.log(findCount.total)

      //更新学科可考试状态
      await this.subjectService.update(sub_second_id, { can_exam: true })
    }

    const create_res: DbCreateData = await this.topicService.create(createTopicDto)
    console.log(create_res)

    return {
      code: 0,
      msg: 'success',
      result: create_res,
    } as HttpRes<DbCreateData>
  }
  /**
   *获取选中二级学科所有题目
   * @param subject_second_id
   * @returns
   */
  @Get('/:subject_second_id')
  async find(@Param('subject_second_id') subject_second_id: string) {
    const find_res: DbFindData<FindTopicDto> = await this.topicService.find({ sub_second_id: subject_second_id })
    return {
      code: 0,
      msg: 'success',
      result: find_res.data,
    } as HttpRes<FindTopicDto[]>
  }
  /**
   * 修改题目
   * @param topic_id
   * @param updateTopicDto
   * @returns
   */
  @Patch(':topic_id')
  async update(@Param('topic_id') topic_id: string, @Body() updateTopicDto: UpdateTopicDto) {
    const update_res: DbUpdate = await this.topicService.update(topic_id, updateTopicDto)
    return {
      code: 0,
      msg: 'success',
      result: update_res,
    } as HttpRes<DbUpdate>
  }
  /**
   * 删除题目
   * @param topic_id  题目ID
   * @returns
   */
  @Delete(':topic_id')
  async remove(@Param('topic_id') topic_id: string) {
    //拿到二级学科id
    const find_res: DbFindData<FindTopicDto> = await this.topicService.findOne({ _id: topic_id })
    const secondSubId = find_res.data[0].sub_second_id

    const delete_res: DbDeleteData = await this.topicService.remove(topic_id)

    //查询删除后题目数量
    const topicCount = await this.topicService.findAll({ sub_second_id: secondSubId })
    console.log(topicCount)

    if (!topicCount.total) {
      await this.subjectService.update(secondSubId, { can_exam: false })
    }

    return {
      code: 0,
      msg: 'success',
      result: delete_res,
    } as HttpRes<DbDeleteData>
  }
}
