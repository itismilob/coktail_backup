import * as Styled from './Main.style'
import Toggle from './ToggleButton'
import DeleteBtn from './DeleteBtn'
import EditBtn from './EditBtn'

const Table = ({
  headers,
  datas,
  isToggle,
  isEdit,
  isDelete,
  toggleHandler,
  editHandler,
  deleteHandler,
  imgURL,
}) => {
  return (
    <Styled.StyledTable>
      <Styled.StyledThead>
        <tr>
          {headers.map((headers, index) => (
            <Styled.StyledTh key={index + headers}>{headers}</Styled.StyledTh>
          ))}
        </tr>
      </Styled.StyledThead>

      <Styled.Tbody>
        {datas && datas.length > 0 ? (
          datas.map((data, datasIndex) => (
            <tr key={datasIndex}>
              {imgURL && (
                <td>
                  <img
                    src={imgURL[datasIndex]}
                    style={{
                      maxWidth: '50px',
                      maxHeight: '50px',
                    }}
                  />
                </td>
              )}

              {data.infos.map((info, index) => (
                <td key={index}>
                  <Styled.TableDiv>{info}</Styled.TableDiv>
                </td>
              ))}

              {/* 토글 */}
              {isToggle &&
                data.isWrite.map((auth, index) => (
                  <td className="tdToggle" key={index}>
                    <Toggle
                      value={data.id[index]}
                      isWrite={auth}
                      toggleHandler={toggleHandler}
                    />
                  </td>
                ))}

              {/* 수정 */}
              {isEdit &&
                data.id &&
                data.id.map((idValue, index) => (
                  <td key={index}>
                    <EditBtn value={idValue} editHandler={editHandler}>
                      Edit
                    </EditBtn>
                  </td>
                ))}

              {/* 삭제 */}
              {isDelete &&
                data.id &&
                data.id.map((idValue, index) => (
                  <td key={index}>
                    <DeleteBtn value={idValue} deleteHandler={deleteHandler} />
                  </td>
                ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length}>해당하는 내용이 없습니다</td>
          </tr>
        )}
      </Styled.Tbody>
    </Styled.StyledTable>
  )
}

export default Table
