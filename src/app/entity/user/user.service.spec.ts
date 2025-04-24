import { HttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { Gender, User, UserRole } from './user.model'

import { UserService } from './user.service'

const expectedUsers: User[] = [
  {
    _id: 'mongo_id',
    firstName: 'Firstname',
    lastName: 'Lastname',
    email: 'user@host.com',
    gender: Gender.male,
    birthDate: new Date(),
    role: UserRole.general,
    friends: [],
    friendRequests: [],
  }
]

describe('UserService', () => {
  let service: UserService
  let httpSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete'])

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpSpy }]
    })
    service = TestBed.inject(UserService)
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return a list of users', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedUsers))

    service.list({}).subscribe((users: User[] | null) => {
      console.log(users)
      expect(users?.length).toBe(1)
      expect(users![0]._id).toEqual(expectedUsers[0]._id)
      done()
    })
  })
  
  it('should return a singular user', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedUsers[0]))

    console.log(expectedUsers[0]._id);
    service.read('mongo_id').subscribe((user: User | null) => {
      console.log(user)
      expect(user!._id).toEqual(expectedUsers[0]._id)
      done()
    })
  })

  // The following methods only return a 204 status with no response as in a User on success, so these are hard to test.

  it('should create a singular user', (done) => {
    httpSpy.post.and.returnValue(of(null))

    service.create(expectedUsers[0]).subscribe((result) => {
      expect(result).toEqual(null!)
      expect(httpSpy.post).toHaveBeenCalled()
      done()
    })
  })

  it('should update a singular user', (done) => {
    httpSpy.put.and.returnValue(of(null))

    service.update(expectedUsers[0]).subscribe((result) => {
      expect(result).toEqual(null!)
      expect(httpSpy.put).toHaveBeenCalled()
      done()
    })
  })

  it('should delete a singular user', (done) => {
    httpSpy.delete.and.returnValue(of(null))

    service.delete(expectedUsers[0]._id!).subscribe((result) => {
      expect(result).toEqual(null!)
      expect(httpSpy.delete).toHaveBeenCalled()
      done()
    })
  })
})
